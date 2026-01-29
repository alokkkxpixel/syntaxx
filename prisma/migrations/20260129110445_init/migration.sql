-- DropForeignKey
ALTER TABLE "Doc" DROP CONSTRAINT "Doc_techId_fkey";

-- CreateIndex
CREATE INDEX "Doc_techId_idx" ON "Doc"("techId");

-- CreateIndex
CREATE INDEX "Doc_slug_idx" ON "Doc"("slug");

-- CreateIndex
CREATE INDEX "DocTag_tagId_idx" ON "DocTag"("tagId");

-- AddForeignKey
ALTER TABLE "Doc" ADD CONSTRAINT "Doc_techId_fkey" FOREIGN KEY ("techId") REFERENCES "Tech"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
