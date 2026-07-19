import AuthHero from "./AuthHero";
import RegisterCard from "./RegisterCard";

export default function Register() {
  return (
    <div className="min-h-screen flex bg-[#050816]">
      <AuthHero />
      <RegisterCard />
    </div>
  );
}