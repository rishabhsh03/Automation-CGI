export default function CategoryProgress({ categories = [] }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">
        Categories
      </h2>

      {categories.map((item) => (
        <div key={item.category} className="mb-4">
          <div className="flex justify-between">
            <span>{item.category}</span>
            <span>{item.total}</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{
                width: `${Number(item.total) * 10}%`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}