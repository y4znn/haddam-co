export function Footer() {
    return (
        <footer className="border-t bg-muted/30">
            <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground font-medium">© 2026 Haddam.co. All rights reserved.</p>
                <div className="flex gap-6 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        Beirut, Lebanon
                    </span>
                    <span>+961 70 123 456</span>
                </div>
            </div>
        </footer>
    );
}
