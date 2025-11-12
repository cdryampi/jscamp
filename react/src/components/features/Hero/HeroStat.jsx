import { cn } from '@/lib/utils';

export const HeroStat = ({ icon: Icon, value, label, className }) => {
  return (
    <div className={cn(
      "flex items-center gap-3! p-4! rounded-xl!",
      "bg-white/90! dark:bg-gray-800/90! backdrop-blur-sm!",
      "border! border-border/50!",
      "shadow-md! hover:shadow-lg!",
      "hover:-translate-y-1! transition-all! duration-300!",
      "group cursor-default",
      className
    )}>
      <div className="p-2.5! rounded-lg! bg-primary/10! dark:bg-primary/20! group-hover:bg-primary/15! dark:group-hover:bg-primary/25! transition-colors! duration-300!">
        <Icon className="w-6! h-6! text-primary! shrink-0!" />
      </div>
      <div className="flex flex-col gap-0!">
        <span className="text-2xl! font-bold! text-foreground! leading-none! m-0! p-0!">{value}</span>
        <span className="text-xs! uppercase! tracking-wide! text-muted-foreground! font-medium! m-0! p-0! mt-0.5!">
          {label}
        </span>
      </div>
    </div>
  );
};
