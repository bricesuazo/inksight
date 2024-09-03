"use client";

import { notFound } from "next/navigation";
import movies from "../../../../data.json";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { ArrowLeft, Trophy } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ScrollArea } from "~/components/ui/scroll-area";
import { convertStringToArray } from "~/lib/utils";

export default function BookPage({
  params: { book_id },
}: {
  params: { book_id: string };
}) {
  const [seeMoreDescription, setSeeMoreDescription] = useState(false);
  const movie = movies.find((movie) => movie.bookId === book_id);

  if (!movie) notFound();

  const genres = convertStringToArray(movie.genres);
  const awards = convertStringToArray(movie.awards);

  return (
    <div className="container mx-auto min-h-[60rem] max-w-screen-lg space-y-10 p-4">
      <div>
        <Button variant="link" asChild>
          <Link href="/">
            <ArrowLeft className="mr-1.5 size-4" />
            Back
          </Link>
        </Button>
      </div>
      <div className="flex flex-col gap-10 md:flex-row">
        <div className="mx-auto md:mx-0">
          <Image
            src={movie.coverImg}
            alt={movie.title}
            width={300}
            height={600}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            className="rounded-lg"
          />
        </div>
        <div className="flex-1 space-y-4">
          <div>
            <h2 className="text-3xl font-bold">{movie.title}</h2>
            <div className="flex flex-col gap-2 sm:flex-row">
              <p className="flex-1 text-secondary-foreground">
                Author: {movie.author}
              </p>
              <p className="flex-1">
                <span className="font-semibold">Publisher:</span>{" "}
                {movie.publisher}
              </p>
            </div>
          </div>
          <p className="text-secondary-foreground">
            <span className="font-semibold">Genre:</span> {genres.join(", ")}
          </p>
          <div className="flex gap-2">
            <p>
              <span className="font-semibold">Published:</span>{" "}
              {new Date(movie.publishDate).toLocaleDateString()}
            </p>
            <p>•</p>
            <p>
              <span className="font-semibold">Pages:</span> {movie.pages}
            </p>
          </div>
          <p>
            {seeMoreDescription ? (
              movie.description
            ) : (
              <>{movie.description.slice(0, 600)}...</>
            )}
            {movie.description.length > 600 && (
              <>
                {" "}
                <Button
                  variant="ghost"
                  className="text-md h-auto cursor-pointer p-1"
                  onClick={() => setSeeMoreDescription(!seeMoreDescription)}
                  asChild
                >
                  <span>{seeMoreDescription ? "See Less" : "See More"}</span>
                </Button>
              </>
            )}
          </p>

          <p>
            <span className="font-semibold">Rating:</span> {movie.rating}
          </p>
          <p>
            <span className="font-semibold">Number of Ratings:</span>{" "}
            {movie.numRatings.toLocaleString()}
          </p>

          {awards.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="font-semibold">Awards</p>
              <ScrollArea className="h-[200px]">
                <div className="flex flex-wrap gap-2">
                  {awards.map((award) => (
                    <div key={award} className="flex items-center gap-2">
                      <div>
                        <Trophy className="size-5 text-secondary-foreground" />
                      </div>
                      <p className="text-sm">{award}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
