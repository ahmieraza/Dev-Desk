import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center px-4">
      <div className="container max-w-2xl mx-auto text-center">
        <div className="card-glass rounded-2xl p-12 shadow-premium">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Thank You!</h1>
          <p className="text-muted-foreground text-lg mb-8">
            We've received your message and will get back to you within 24 hours.
          </p>
          <button
            onClick={() => navigate("/")}
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-2 mx-auto text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
