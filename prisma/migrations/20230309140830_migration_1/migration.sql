-- CreateTable
CREATE TABLE "Book" (
    "id" INTEGER NOT NULL,
    "author" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "isLiked" BOOLEAN NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);
