UPDATE "Player"
SET
  "nickname" = 'temp_nick_' || id
WHERE
  "nickname" IS NULL;