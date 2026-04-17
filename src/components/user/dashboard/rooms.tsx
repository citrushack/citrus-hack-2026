import { Badge } from "@/components/ui/badge";

const rooms: string[] = ["Bytes", "WCH 127", "WCH 129", "WCH 203"];

const Rooms = (): React.ReactNode => {
  return (
    <div className="rounded-lg bg-white p-3 font-bold shadow-xl">
      <div className="p-2">🚪Hackrooms</div>
      <div className="flex gap-3">
        {rooms.map((room: string, index: number) => (
          <Badge key={index}>{room}</Badge>
        ))}
      </div>
    </div>
  );
};

export default Rooms;
