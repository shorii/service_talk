use crate::controller::model::{RoomRequest, RoomResponse};
use crate::domain::{IRoomRepository, Room};
use crate::infra::repository::RoomRepository;
use crate::state::AppState;
use actix_web::{delete, get, patch, post, web, HttpResponse, Responder};
use sea_orm::entity::prelude::Uuid;
use std::str::FromStr;

macro_rules! get_repository {
    ($data: ident) => {
        RoomRepository::new($data.into_inner().as_ref().clone().conn)
    };
}

#[get("/room")]
async fn get_rooms(data: web::Data<AppState>) -> impl Responder {
    let repository = get_repository!(data);
    let rooms = repository.find_all().await;
    HttpResponse::Ok().json(
        rooms
            .iter()
            .map(|x| {
                let cloned = x.clone();
                RoomResponse {
                    id: cloned.id,
                    name: cloned.name,
                    description: cloned.description,
                }
            })
            .collect::<Vec<_>>(),
    )
}

#[get("/room/{room_id}")]
async fn get_room(data: web::Data<AppState>, room_id: web::Path<String>) -> impl Responder {
    let repository = get_repository!(data);
    let room = repository
        .get_by_id(Uuid::from_str(&room_id).unwrap())
        .await;
    match room {
        Some(m) => HttpResponse::Ok().json(RoomResponse {
            id: m.id,
            name: m.name,
            description: m.description,
        }),
        None => HttpResponse::NotFound().finish(),
    }
}

#[post("/room")]
async fn create_room(data: web::Data<AppState>, request: web::Json<RoomRequest>) -> impl Responder {
    let repository = get_repository!(data);
    let new_room = Room::new(request.name.clone(), request.description.clone());
    let result = repository.create(new_room.clone()).await;
    match result {
        Ok(room) => HttpResponse::Ok().json(RoomResponse {
            id: room.id,
            name: room.name,
            description: room.description,
        }),
        Err(_) => HttpResponse::Conflict().finish(),
    }
}

#[patch("/room/{room_id}")]
async fn update_room(
    data: web::Data<AppState>,
    room_id: web::Path<String>,
    request: web::Json<RoomRequest>,
) -> impl Responder {
    let repository = get_repository!(data);
    let room = repository
        .get_by_id(Uuid::from_str(&room_id).unwrap())
        .await;
    match room {
        Some(mut m) => {
            m.change_name(&request.name);
            m.change_description(&request.description);
            let result = repository.update(m.clone()).await;
            match result {
                Ok(m) => HttpResponse::Ok().json(RoomResponse {
                    id: m.id,
                    name: m.name,
                    description: m.description,
                }),
                Err(_) => HttpResponse::Conflict().finish(),
            }
        }
        None => HttpResponse::NotFound().finish(),
    }
}

#[delete("/room/{room_id}")]
async fn delete_room(data: web::Data<AppState>, room_id: web::Path<String>) -> impl Responder {
    let repository = get_repository!(data);
    let room = repository
        .get_by_id(Uuid::from_str(&room_id).unwrap())
        .await;
    if let Some(m) = room {
        let result = repository.delete(m.clone()).await;
        if let Ok(()) = result {
            return HttpResponse::Ok().json(());
        }
    }
    HttpResponse::NotFound().finish()
}

pub fn init_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(get_rooms);
    cfg.service(get_room);
    cfg.service(create_room);
    cfg.service(update_room);
    cfg.service(delete_room);
}
