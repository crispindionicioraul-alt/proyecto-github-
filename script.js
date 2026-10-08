
    const flowExamples = {
      leads: {
        tag: "Flujo de ventas",
        title: "Cada lead, atendido.",
        description: "Cuando alguien completa tu formulario, Visionarius le da la bienvenida, lo organiza y avisa a la persona adecuada.",
        nodes: ["Formulario", "Email de bienvenida", "CRM actualizado"],
        icons: ["form", "mail", "crm"]
      },
      equipo: {
        tag: "Flujo de equipo",
        title: "Novedades, sin perseguirlas.",
        description: "Una tarea cambia de estado y el canal correcto recibe el contexto, sin mensajes manuales ni idas y vueltas.",
        nodes: ["Tarea actualizada", "Filtrar cambios", "Aviso en Slack"],
        icons: ["task", "filter", "chat"]
      },
      pagos: {
        tag: "Flujo de operaciones",
        title: "Pagos bajo control.",
        description: "Registra cada pago, actualiza tu hoja de control y recibe un aviso cuando algo requiera seguimiento.",
        nodes: ["Pago recibido", "Actualizar registro", "Avisar al equipo"],
        icons: ["pay", "sheet", "chat"]
      }
    };
    const iconMarkup = {
      form: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h4"/>',
      mail: '<path d="M4 6h16v12H4zM4 7l8 6 8-6"/>',
      crm: '<path d="M4 5h16v14H4zM8 9h8M8 13h5"/>',
      task: '<path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h4"/><path d="m15 16 1 1 2-2"/>',
      filter: '<path d="M4 5h16l-6 7v5l-4 2v-7z"/>',
      chat: '<path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8 8 0 0 1-3-.6L4 20l1.5-4A7.1 7.1 0 0 1 4 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 8 7.5Z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/>',
      pay: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',
      sheet: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M4 9h16M10 9v12M15 9v12"/>'
    };
    const miniFlow = document.getElementById("mini-flow");
    const tabs = document.querySelectorAll(".tab");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((item) => item.setAttribute("aria-selected", String(item === tab)));
        const flow = flowExamples[tab.dataset.flow];
        document.getElementById("flow-tag").textContent = flow.tag;
        document.getElementById("flow-title").textContent = flow.title;
        document.getElementById("flow-description").textContent = flow.description;
        miniFlow.innerHTML = flow.nodes.map((label, index) => {
          const color = ["node-orange", "node-green", "node-blue"][index];
          const node = `<div class="mini-node"><svg class="${color}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">${iconMarkup[flow.icons[index]]}</svg><span>${label}</span></div>`;
          return index < flow.nodes.length - 1 ? `${node}<span class="mini-connector" aria-hidden="true"></span>` : node;
        }).join("");
      });
    });
    const runButton = document.getElementById("run-demo");
    const runLabel = document.getElementById("run-label");
    const toast = document.getElementById("toast");
    let toastTimer;
    runButton.addEventListener("click", () => {
      const nodes = document.querySelectorAll("#hero-canvas .flow-node");
      const lines = document.querySelectorAll("#hero-canvas .flow-line");
      runButton.disabled = true;
      runLabel.textContent = "Ejecutando automatización...";
      nodes.forEach((node, index) => setTimeout(() => node.classList.add("running"), index * 220));
      lines.forEach((line) => line.classList.add("running"));
      setTimeout(() => {
        nodes.forEach((node) => node.classList.remove("running"));
        lines.forEach((line) => line.classList.remove("running"));
        runLabel.textContent = "Última ejecución: hace un momento";
        runButton.disabled = false;
        toast.classList.add("show");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
      }, 1450);
    });
  