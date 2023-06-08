import { useEffect, useState } from "react";
import { StreamerPanel as StreamerPanelType } from "../types/types";
import { config } from "../config/config";

export const StreamerPanel = ({ id }: { id: string }) => {
  const [panels, setPanels] = useState<{ data: StreamerPanelType }>();
  useEffect(() => {
    if (!id) {
      return;
    }

    (async () => {
      try {
        const response = await fetch(
          `https://${config.api}/streamer/${id}/panels`
        );
        const [data] = await response.json();
        if (!data) return;
        setPanels(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [id]);

  return (
    <div className="grid grid-cols-3 gap-4 px-8 max-w-5xl mx-auto   ">
      {panels?.data?.user?.panels.map((panel, i) => {
        if (panel?.__typename !== "DefaultPanel") return;
        return (
          <div key={i} className="flex flex-col gap-2">
            <div className="text-white text-xl font-bold">{panel.title}</div>
            <a
              href={panel.linkURL}
              target="_blank"
              className="flex justify-center"
            >
              <img src={panel.imageURL} alt={panel.title} className="w-full" />
            </a>
            <div className="text-white text-sm">{panel.description}</div>
          </div>
        );
      })}
    </div>
  );
};
