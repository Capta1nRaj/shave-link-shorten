import { FetchWebsiteStats } from "@/server/FetchWebsiteStats";

export default async function WebsiteStatsLayout() {

  const { usersCount, linksCreatedCount, linksTrackedCount } = await FetchWebsiteStats();

  //! Formatting values to show in "k" instead of numbers
  function formatNumber(value: number) {
    if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'k+';
    } else if (value >= 100) {
      return Math.floor(value / 100) * 100 + 100 + '+';
    } else if (value >= 10) {
      return Math.floor(value / 10) * 10 + 10 + '+';
    } else {
      return (value + 5) + '+';
    }
  }

  const stats = [
    { name: 'Users', value: formatNumber(usersCount) },
    { name: 'Tracked Clicks', value: formatNumber(linksTrackedCount) },
    { name: 'Links Generated', value: formatNumber(linksCreatedCount) },
  ];

  return (
    <div className="bg-primary-1 py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl"> <span className="text-primary-3 underline underline-offset-4 capitalize">trusted</span> by creators worldwide </h2>
            <p className="mt-4 text-lg leading-8 text-white">
              {/* Working on it, to grow the numbers. */}
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.name} className="flex flex-col bg-primary-2 p-8">
                <dt className="text-sm font-semibold leading-6 text-primary-4">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-white">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
