import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout showFooter={false}>
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-accent/10 flex items-center justify-center">
            <span className="text-5xl font-display font-bold text-accent">404</span>
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground mb-4">
            Page Not Found
          </h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/">
              <Button variant="accent" size="lg" className="gap-2">
                <Home className="w-5 h-5" />
                Go Home
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.history.back()}
              className="gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
