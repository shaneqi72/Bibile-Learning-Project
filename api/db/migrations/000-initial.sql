CREATE TABLE public.users (
	id uuid NOT NULL,
	"firstName" varchar(255) NULL,
	"lastName" varchar(255) NULL,
	username varchar(255) NULL,
	password varchar(255) NULL,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	CONSTRAINT users_username_key UNIQUE (username),
	CONSTRAINT users_pkey PRIMARY KEY (id)
);