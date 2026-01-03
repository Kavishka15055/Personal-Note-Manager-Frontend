import React from "react";
import { Link } from "react-router-dom";
import {
  Lock,
  Smartphone,
  Zap,
  Sparkles,
  Search,
  Shield,
  ArrowRight,
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
        <div className="relative container mx-auto px-4 py-24">
          <div className="text-center ">
            <h1 className="mx-auto mb-6 max-w-4xl text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
              Organize Your
              <span className="block mt-5 tracking-tight text-gray-900 dark:text-gray-100">
  Thoughts, Effortlessly
</span>
            </h1>
            <p className="mx-auto mb-20 max-w-2xl text-xl text-white/90 pt-5">
              A modern, intuitive platform to capture, organize, and rediscover
              your thoughts. Built for clarity and productivity.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                to="/signup"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-3 text-lg font-semibold text-primary-600 transition-all hover:scale-105 hover:shadow-xl"
              >
                Sign Up Now
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white bg-transparent px-8 py-3 text-lg font-semibold text-white transition-all hover:bg-white/10"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
