#!/bin/bash

psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -a -f /qr_code/prisma/database/data.sql
