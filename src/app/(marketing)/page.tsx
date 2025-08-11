import {
    Background,
    Companies,
    Connect,
    Container,
    CTA,
    Features,
    Hero,
    NewsletterSignup,
    Perks,
    Pricing,
    Reviews,
    Wrapper,
} from "@/components";
import { Spotlight } from "@/components/ui/spotlight";

const HomePage = () => {
    return (
        <Background>
            <Wrapper className="py-20 relative">
                <Container className="relative">
                    <Spotlight
                        className="-top-40 left-0 md:left-60 md:-top-20"
                        fill="rgba(255, 255, 255, 0.5)"
                    />
                    <Hero />
                </Container>

                {/* Newsletter Signup Section */}
                <Container className="py-12 lg:py-20">
                    <div className="flex flex-col items-center justify-center text-center w-full px-4 md:px-0 mx-auto h-[400px] border border-foreground/10 rounded-3xl overflow-hidden relative">
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-12 bg-primary/30 blur-[10rem]" />
                        <div className="flex flex-col items-center justify-center w-full z-20">
                            <h2 className="text-4xl md:text-5xl font-heading heading font-semibold !leading-tight mb-4">
                                Stay Updated
                            </h2>
                            <p className="text-base md:text-lg text-center text-accent-foreground/60 max-w-xl mx-auto mb-8">
                                Get the latest updates and insights delivered to
                                your inbox.
                            </p>
                            <div className="max-w-md mx-auto w-full">
                                <NewsletterSignup
                                    variant="hero"
                                    placeholder="Enter your email address"
                                    buttonText="Subscribe"
                                    className="w-full"
                                />
                            </div>
                        </div>
                    </div>
                </Container>

                <Container className="py-8 lg:py-20">
                    <Companies />
                </Container>
                <Connect />
                <Features />
                <Perks />
                <Pricing />
                <Reviews />
                <CTA />
            </Wrapper>
        </Background>
    );
};

export default HomePage;
