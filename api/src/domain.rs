use async_trait::async_trait;
use sea_orm::entity::prelude::Uuid;
use sea_orm::DbErr;

#[derive(Clone, Debug)]
pub struct Room {
    pub id: Uuid,
    pub name: String,
    pub description: String,
}

impl Room {
    pub fn new(name: String, description: String) -> Self {
        Room {
            id: Uuid::new_v4(),
            name,
            description,
        }
    }

    pub fn change_name(&mut self, name: &str) {
        self.name = name.to_string();
    }

    pub fn change_description(&mut self, description: &str) {
        self.description = description.to_string();
    }
}

#[async_trait]
pub trait IRoomRepository {
    async fn find_all(&self) -> Vec<Room>;
    async fn get_by_id(&self, id: Uuid) -> Option<Room>;
    async fn create(&self, room: Room) -> Result<Room, DbErr>;
    async fn update(&self, room: Room) -> Result<Room, DbErr>;
    async fn delete(&self, room: Room) -> Result<(), DbErr>;
}
