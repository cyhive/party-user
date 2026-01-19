type FeatureCardProps = {
  icon: string;
  title: string;
  description: string;
};

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="bg-white border border-gray-200  rounded-xl p-8 text-center shadow-sm hover:shadow-md transition">

      <div className="text-4xl mb-4">{icon}</div>

      <h3 className="text-lg font-semibold">{title}</h3>

      <p className="text-gray-600 text-sm mt-3">
        {description}
      </p>

      <button className="mt-6 bg-red-600 text-white px-4 py-2 rounded text-sm font-medium">
        Learn More
      </button>
    </div>
  );
}
