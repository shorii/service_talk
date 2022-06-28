CREATE TABLE talk.room (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    UNIQUE(name)
);
