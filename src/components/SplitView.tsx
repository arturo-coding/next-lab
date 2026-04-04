"use client";

import * as React from "react";
import { Panel, Group, Separator } from "react-resizable-panels";

interface SplitViewProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

export default function SplitView({ left, right }: SplitViewProps) {
  return (
    <div className="flex-1 w-full glass rounded-xl overflow-hidden border border-white/10 shadow-2xl">
      <Group orientation="horizontal">
        <Panel defaultSize={50} minSize={30}>
          <div className="h-full bg-[#0d1117] relative">
            <div className="absolute top-3 left-4 text-[10px] uppercase tracking-widest text-gray-500 font-bold pointer-events-none z-10">
              Code
            </div>
            {left}
          </div>
        </Panel>

        <Separator className="w-1 bg-white/5 hover:bg-blue-500/50 transition-colors cursor-col-resize flex items-center justify-center">
          <div className="w-[1px] h-8 bg-white/20" />
        </Separator>

        <Panel defaultSize={50} minSize={30}>
          <div className="h-full bg-[#0a0a0a] relative flex flex-col">
            <div className="absolute top-3 left-4 text-[10px] uppercase tracking-widest text-gray-500 font-bold pointer-events-none z-10">
              Preview
            </div>
            <div className="flex-1 overflow-auto p-8 pt-12">{right}</div>
          </div>
        </Panel>
      </Group>
    </div>
  );
}
