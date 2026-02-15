export interface HeroSlide {
    id: number;
    subtitle: string;
    title: string;
    description: string;
    cta_text: string;
    cta_link: string;
    image_url: string;
}

export interface Promotion {
    id: number;
    title: string;
    description: string;
    image_url: string;
    original_price: number;
    sale_price: number;
    discount_percent: number;
    cta_link: string;
    expires_at: string | null;
}

export interface Testimonial {
    id: number;
    name: string;
    role: string;
    avatar_url: string | null;
    text: string;
    rating: number;
}

export interface HomeStats {
    total_orders: number;
    total_customers: number;
    total_products: number;
}

export interface HomeDataResponse {
    heroSlides: HeroSlide[];
    promotion: Promotion | null;
    testimonials: Testimonial[];
    popularProducts: any[];
    stats: HomeStats;
}

let pendingRequest: Promise<HomeDataResponse> | null = null;

export async function fetchHomeData(): Promise<HomeDataResponse> {
    if (!pendingRequest) {
        pendingRequest = fetch("/api/home")
            .then(async (res) => {
                if (!res.ok) {
                    throw new Error(`Home API failed with status ${res.status}`);
                }
                return res.json() as Promise<HomeDataResponse>;
            })
            .catch((error) => {
                pendingRequest = null;
                throw error;
            });
    }

    return pendingRequest;
}

