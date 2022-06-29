use crate::domain::{IRoomRepository, Room};
use crate::infra::db::room;
use async_trait::async_trait;
use sea_orm::entity::prelude::Uuid;
use sea_orm::query::Statement;
use sea_orm::{ConnectionTrait, DatabaseConnection, DbBackend, DbErr, FromQueryResult};

pub struct RoomRepository {
    conn: DatabaseConnection,
}

impl RoomRepository {
    pub fn new(conn: DatabaseConnection) -> Self {
        Self { conn }
    }
}

#[async_trait]
impl IRoomRepository for RoomRepository {
    async fn find_all(&self) -> Vec<Room> {
        let models = room::Model::find_by_statement(Statement::from_sql_and_values(
            DbBackend::Postgres,
            r#"
            SELECT
                id,
                name,
                description
            FROM
                "talk"."room"
            "#,
            vec![],
        ))
        .all(&self.conn)
        .await
        .expect("db error occurred");
        models
            .iter()
            .map(|m| Room {
                id: m.id,
                name: m.name.clone(),
                description: m.description.clone(),
            })
            .collect::<Vec<_>>()
    }

    async fn get_by_id(&self, id: Uuid) -> Option<Room> {
        let model = room::Model::find_by_statement(Statement::from_sql_and_values(
            DbBackend::Postgres,
            r#"
            SELECT
                id,
                name,
                description
            FROM
                "talk"."room"
            WHERE
                id = $1
            "#,
            vec![id.into()],
        ))
        .one(&self.conn)
        .await
        .expect("db error occurred");
        match model {
            Some(room) => Some(Room {
                id: room.id,
                name: room.name,
                description: room.description,
            }),
            None => None,
        }
    }

    async fn create(&self, room: Room) -> Result<Room, DbErr> {
        self.conn
            .execute(Statement::from_sql_and_values(
                DbBackend::Postgres,
                r#"INSERT INTO "talk"."room" (name, description) VALUES ($1, $2)"#,
                {
                    let user = room.clone();
                    vec![user.name.into(), user.description.into()]
                },
            ))
            .await?;
        Ok(room)
    }

    async fn update(&self, room: Room) -> Result<Room, DbErr> {
        self.conn
            .execute(Statement::from_sql_and_values(
                DbBackend::Postgres,
                r#"UPDATE "talk"."room" SET name = $1, description = $2 WHERE id = $3"#,
                {
                    let room = room.clone();
                    vec![room.name.into(), room.description.into(), room.id.into()]
                },
            ))
            .await?;
        Ok(room)
    }

    async fn delete(&self, room: Room) -> Result<(), DbErr> {
        self.conn
            .execute(Statement::from_sql_and_values(
                DbBackend::Postgres,
                r#"DELETE FROM "talk"."room" WHERE id = $1"#,
                vec![room.id.into()],
            ))
            .await?;
        Ok(())
    }
}
