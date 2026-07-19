"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Code, Copy, Check } from "lucide-react";
import { NODE_META } from "./shared";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useFlowEditor } from "./flow-editor-state";

interface CodeEditorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CodeEditorDialog({ open, onOpenChange }: CodeEditorDialogProps) {
  const { state, setState } = useFlowEditor();
  const [json, setJson] = useState("");
  const [copied, setCopied] = useState(false);

  // Sync state to local JSON string when opened.
  useEffect(() => {
    if (open) {
      setJson(JSON.stringify(state, null, 2));
      setCopied(false);
    }
  }, [open, state]);

  const handleApply = () => {
    try {
      const parsed = JSON.parse(json);
      
      // Sanitize the imported payload so we never inject invalid node types
      if (Array.isArray(parsed.nodes)) {
        parsed.nodes = parsed.nodes.filter((n: any) => n && n.node_type && NODE_META[n.node_type as keyof typeof NODE_META]);
      }

      // Let the engine validate it on the next save attempt
      setState(parsed);
      toast.success("Flow updated from JSON");
      onOpenChange(false);
    } catch (err) {
      toast.error("Invalid JSON format");
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(json);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[85vh] flex-col sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Code className="h-4 w-4" /> Flow Code
          </DialogTitle>
          <DialogDescription>
            Edit the raw JSON representation of this flow. You can copy this to
            share or back up, and paste in JSON to overwrite the current flow.
          </DialogDescription>
        </DialogHeader>

        <div className="relative min-h-[400px] flex-1 overflow-hidden rounded-md border">
          <Textarea
            value={json}
            onChange={(e) => setJson(e.target.value)}
            className="h-full w-full resize-none border-0 bg-muted/30 p-4 font-mono text-sm focus-visible:ring-1"
            spellCheck={false}
          />
        </div>

        <DialogFooter className="flex w-full items-center justify-between sm:justify-between">
          <Button variant="outline" onClick={handleCopy} className="gap-2">
            {copied ? (
              <Check className="h-4 w-4 text-emerald-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            {copied ? "Copied" : "Copy JSON"}
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleApply}>Apply Changes</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
