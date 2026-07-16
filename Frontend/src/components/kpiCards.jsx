export default function KpiCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-xl shadow-lg border overflow-hidden">
      <div className="flex justify-between items-center h-40">
        {/* Left Side */}
        <div className="p-6">
          <p className="text-gray-500 text-lg">{title}</p>
          <h1 className="text-5xl font-bold mt-3">{value}</h1>
        </div>

        {/* Right Side */}
        <div className="w-40 h-full">
          <img
            src={icon}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}