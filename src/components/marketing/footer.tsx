import { FOOTER_LINKS } from "@/constants";
import Link from "next/link";
import Container from "../global/container";
import Icons from "../global/icons";
import Wrapper from "../global/wrapper";
import { Button } from "../ui/button";
import { Particles } from "../ui/particles";

/**
 * Renders a footer component with a logo, description, and links.
 *
 * The footer includes a background of animated particles, a section for the company logo and a brief description,
 * a call-to-action button, and navigation links organized into sections. It also features social media icons.
 */
const Footer = () => {
    return (
        <footer className="w-full py-10 relative">
            <Container>
                <Wrapper className="relative flex flex-col md:flex-row justify-between pb-40 overflow-hidden footer">
                    <Particles
                        className="absolute inset-0 w-full -z-10"
                        quantity={40}
                        ease={10}
                        color="#d4d4d8"
                        refresh
                    />
                    <div className="flex flex-col items-start max-w-48">
                        <div className="flex items-center gap-2">
                            {typeof Icons.Logo === "function" && (
                                <Icons.Logo className="w-5 h-5" />
                            )}

                            <span className="text-xl font-medium">Luro</span>
                        </div>
                        <p className="text-base max-w mt-4">
                            Empower your business with our AI tools.
                        </p>
                        <Button className="mt-8">
                            <Link href="/app">Start for free</Link>
                        </Button>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-lg mt-10 md:mt-0">
                        {FOOTER_LINKS?.map((section) => (
                            <div key={section.title} className="flex flex-col gap-4">
                                <h4 className="text-sm font-medium">
                                    {section.title}
                                </h4>
                                <ul className="space-y-4 w-full">
                                    {section.links.map((link) => (
                                        <li
                                            key={link.name}
                                            className="text-sm text-muted-foreground hover:text-foreground transition-all w-full"
                                        >
                                            <Link
                                                href={link.href}
                                                className="w-full"
                                            >
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </Wrapper>
            </Container>
            <Container>
                <Wrapper className="pt-10 flex items-center justify-between relative">
                    <p className="text-sm text-secondary-foreground">
                        &copy; {new Date().getFullYear()} Luro. All rights
                        reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <Link href="#" className="p-1">
                            {typeof Icons.instagram === "function" && (
                                <Icons.instagram className="w-5 h-5 text-muted-foreground hover:text-secondary-foreground" />
                            )}
                        </Link>
                        <Link href="#" className="p-1">
                            {typeof Icons.twitter === "function" && (
                                <Icons.twitter className="w-5 h-5 text-muted-foreground hover:text-secondary-foreground" />
                            )}
                        </Link>
                        <Link href="#" className="p-1">
                            {typeof Icons.discord === "function" && (
                                <Icons.discord className="w-5 h-5 text-muted-foreground hover:text-secondary-foreground" />
                            )}
                        </Link>
                    </div>
                </Wrapper>
            </Container>
        </footer>
    );
};

export default Footer;
