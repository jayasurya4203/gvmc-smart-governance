"use client";

import { ModulePage } from "@/components/shared/module-page";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/contexts/app-context";

const tasks = [
  { id: "1", title: "Pothole repair — MVP Colony", priority: "high" },
  { id: "2", title: "Garbage pickup — Ward 14", priority: "medium" },
  { id: "3", title: "Streetlight — Dwarakanagar", priority: "low" },
];

export default function WorkerPage() {
  const { t } = useApp();

  return (
    <ModulePage
      titleEn="Field Worker App"
      titleTe="ఫీల్డ్ వర్కర్ యాప్"
      descriptionEn="Assigned tasks, route optimization, geo-tagged proof, and before/after uploads."
      descriptionTe="టాస్క్‌లు, రూట్, జియో-ట్యాగ్ ప్రూఫ్, ఫోటోలు."
    >
      <ul className="space-y-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between rounded-xl border border-gvmc-border px-4 py-3"
          >
            <span className="text-sm font-medium">{task.title}</span>
            <Badge
              tone={
                task.priority === "high"
                  ? "danger"
                  : task.priority === "medium"
                    ? "warning"
                    : "default"
              }
            >
              {task.priority}
            </Badge>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-gvmc-muted">
        {t("Navigation & attendance tracking — mobile PWA next.", "నావిగేషన్ & హాజరు — తదుపరి PWA.")}
      </p>
    </ModulePage>
  );
}
