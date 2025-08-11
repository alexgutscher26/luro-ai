import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const meta: Meta<typeof Carousel> = {
    title: "UI/Carousel",
    component: Carousel,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicCarousel: Story = {
    render: () => (
        <div className="w-full max-w-xs">
            <Carousel>
                <CarouselContent>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index}>
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                        <span className="text-4xl font-semibold">
                                            {index + 1}
                                        </span>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    ),
};

const productData = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: "$99",
        image: "🎧",
        rating: 4.5,
        category: "Electronics",
    },
    {
        id: 2,
        name: "Smart Watch",
        price: "$299",
        image: "⌚",
        rating: 4.8,
        category: "Wearables",
    },
    {
        id: 3,
        name: "Laptop Stand",
        price: "$49",
        image: "💻",
        rating: 4.2,
        category: "Accessories",
    },
    {
        id: 4,
        name: "Bluetooth Speaker",
        price: "$79",
        image: "🔊",
        rating: 4.6,
        category: "Audio",
    },
    {
        id: 5,
        name: "Wireless Mouse",
        price: "$39",
        image: "🖱️",
        rating: 4.3,
        category: "Accessories",
    },
];

export const ProductCarousel: Story = {
    render: () => (
        <div className="w-full max-w-4xl">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
            >
                <CarouselContent className="-ml-2 md:-ml-4">
                    {productData.map(product => (
                        <CarouselItem
                            key={product.id}
                            className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                        >
                            <Card className="h-full">
                                <CardContent className="p-6">
                                    <div className="text-6xl mb-4 text-center">
                                        {product.image}
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Badge variant="secondary">
                                                {product.category}
                                            </Badge>
                                            <span className="text-sm text-muted-foreground">
                                                ⭐ {product.rating}
                                            </span>
                                        </div>
                                        <h3 className="font-semibold text-lg">
                                            {product.name}
                                        </h3>
                                        <div className="flex items-center justify-between">
                                            <span className="text-2xl font-bold text-primary">
                                                {product.price}
                                            </span>
                                            <Button size="sm">
                                                Add to Cart
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    ),
};

export const VerticalCarousel: Story = {
    render: () => (
        <div className="w-full max-w-xs mx-auto">
            <Carousel
                orientation="vertical"
                opts={{
                    align: "start",
                }}
                className="w-full max-w-xs"
            >
                <CarouselContent className="-mt-1 h-[300px]">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index} className="pt-1 md:basis-1/2">
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex items-center justify-center p-6">
                                        <span className="text-2xl font-semibold">
                                            Slide {index + 1}
                                        </span>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    ),
};
