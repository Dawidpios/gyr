-- Dodaj nową kolumnę
ALTER TABLE "recipes" ADD COLUMN "ingredients_new" JSONB;

-- Przenieś dane ze starej kolumny do nowej
UPDATE "recipes" SET "ingredients_new" = jsonb_build_array(jsonb_build_object(
  'name', "ingredients",
  'amount', 0,
  'unit', 'g'
));

-- Usuń starą kolumnę
ALTER TABLE "recipes" DROP COLUMN "ingredients";

-- Zmień nazwę nowej kolumny
ALTER TABLE "recipes" RENAME COLUMN "ingredients_new" TO "ingredients";

-- Ustaw NOT NULL
ALTER TABLE "recipes" ALTER COLUMN "ingredients" SET NOT NULL; 