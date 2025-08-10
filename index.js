<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8" />
<title>Digi Fast Bot - Surebets en temps réel</title>
<style>
  body { font-family: Arial, sans-serif; margin: 20px; }
  table { border-collapse: collapse; width: 100%; }
  th, td { border: 1px solid #ccc; padding: 8px; text-align: center; }
  th { background-color: #007bff; color: white; }
</style>
</head>
<body>
<h1>Digi Fast Bot - Surebets simulés</h1>
<table id="surebets-table">
  <thead>
    <tr>
      <th>Match</th>
      <th>Site 1</th>
      <th>Site 2</th>
      <th>Côte 1</th>
      <th>Côte 2</th>
      <th>Surebet ?</th>
    </tr>
  </thead>
  <tbody></tbody>
</table>
<script>
  // Données simulées pour l'exemple
  function getSimulatedSurebets() {
    return [
      {match: "Equipe A vs Equipe B", site1: "1xBet", site2: "Melbet", cote1: 2.10, cote2: 2.00, surebet: true},
      {match: "Equipe C vs Equipe D", site1: "PremierBet", site2: "Betway", cote1: 1.90, cote2: 2.05, surebet: true},
      {match: "Equipe E vs Equipe F", site1: "888Starz", site2: "Malibet", cote1: 1.80, cote2: 1.95, surebet: false}
    ];
  }

  function updateTable() {
    const tbody = document.querySelector("#surebets-table tbody");
    tbody.innerHTML = "";
    const data = getSimulatedSurebets();
    data.forEach(row => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${row.match}</td>
        <td>${row.site1}</td>
        <td>${row.site2}</td>
        <td>${row.cote1.toFixed(2)}</td>
        <td>${row.cote2.toFixed(2)}</td>
        <td>${row.surebet ? "✅ Oui" : "❌ Non"}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  updateTable();
  setInterval(updateTable, 60000); // Mise à jour toutes les 60 secondes
</script>
</body>
</html>
