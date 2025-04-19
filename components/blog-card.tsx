"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useState } from "react";

interface BlogCardProps {
  title: string;
  description: string;
  date: string;
  category: string;
  slug: string;
  image: string;
}

export function BlogCard({
  title,
  description,
  date,
  category,
  slug,
  image,
}: BlogCardProps) {
  const [imgSrc, setImgSrc] = useState(image);

  return (
    <Link href={`/blog/${slug}`} className="group">
      <Card className="h-full overflow-hidden transition-all hover:shadow-md">
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all z-10" />
          <div className="relative h-full w-full transition-all group-hover:scale-105">
            <Image
              src={imgSrc}
              alt={title}
              fill
              className="object-fill"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
              onError={() => setImgSrc("/blog/placeholder.png")}
            />
          </div>
        </div>
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="px-2 py-1 text-xs">
              {category}
            </Badge>
            <span className="text-xs text-muted-foreground">{date}</span>
          </div>
          <h3 className="font-bold text-xl mt-2 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-muted-foreground line-clamp-3">{description}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <span className="text-sm font-medium text-primary">Read more</span>
        </CardFooter>
      </Card>
    </Link>
  );
}
