interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

export default function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div 
      className="bg-white border border-gray-100 shadow-2xl shadow-gray-200/50 flex flex-col items-center text-center justify-between p-8 w-full max-w-[392px] min-h-[332px]"
      style={{
        borderRadius: '15px',
        opacity: 1,
      }}
    >
      {/* Icon with soft background */}
      <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-3xl mb-4">
         {icon}
      </div>

      <div className="flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">
          {title}
        </h3>
        <p className="text-gray-500 text-sm md:text-base leading-relaxed px-2">
          {description}
        </p>
      </div>

      <button className="mt-6 bg-[#e32626] hover:bg-red-700 text-white px-8 py-2.5 rounded-lg font-bold text-sm transition-all hover:shadow-lg active:scale-95">
        Learn More
      </button>
    </div>
  );
}