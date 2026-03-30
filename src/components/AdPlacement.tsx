const AdPlacement = ({ position }: { position: "banner" | "inline" | "footer" }) => {
  const styles: Record<string, string> = {
    banner: "h-20 rounded-lg",
    inline: "h-24 rounded-lg my-6",
    footer: "h-16 rounded-none",
  };

  return (
    <div className={`flex items-center justify-center border border-dashed border-border bg-muted/50 text-xs text-muted-foreground ${styles[position]}`}>
      Ad Space — {position}
    </div>
  );
};

export default AdPlacement;
