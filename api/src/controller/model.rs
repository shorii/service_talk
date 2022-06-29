use sea_orm::entity::prelude::Uuid;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]
pub struct RoomResponse {
    pub id: Uuid,
    pub name: String,
    pub description: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct RoomRequest {
    pub name: String,
    pub description: String,
}
