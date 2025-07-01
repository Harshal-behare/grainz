import * as React from "react";

interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
}

export function Tabs({ defaultValue, children, className = "" }: TabsProps) {
  const [active, setActive] = React.useState(defaultValue);
  // Provide context for triggers and content
  return (
    <TabsContext.Provider value={{ active, setActive }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

export function TabsList({ children, className = "" }: TabsListProps) {
  return (
    <div className={`flex border-b border-gray-200 mb-4 ${className}`.trim()}>{children}</div>
  );
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const TabsContext = React.createContext<any>(null);

export function TabsTrigger({ value, children, className = "" }: TabsTriggerProps) {
  const ctx = React.useContext(TabsContext);
  const isActive = ctx.active === value;
  return (
    <button
      type="button"
      onClick={() => ctx.setActive(value)}
      className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors duration-200 focus:outline-none ${
        isActive
          ? "border-green-500 text-green-600 bg-white"
          : "border-transparent text-gray-500 hover:text-green-600 hover:border-green-300 bg-gray-50"
      } ${className}`.trim()}
    >
      {children}
    </button>
  );
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function TabsContent({ value, children, className = "" }: TabsContentProps) {
  const ctx = React.useContext(TabsContext);
  if (ctx.active !== value) return null;
  return <div className={className}>{children}</div>;
} 