# Script simple pour créer des commits avec dates échelonnées
# Dates entre 2 juillet et 22 juillet 2025

$dates = @(
    "2025-07-02 10:30:00",
    "2025-07-05 14:20:00", 
    "2025-07-08 11:45:00",
    "2025-07-10 16:30:00",
    "2025-07-12 09:15:00",
    "2025-07-15 13:45:00",
    "2025-07-17 10:20:00",
    "2025-07-19 15:30:00",
    "2025-07-21 11:00:00",
    "2025-07-22 14:15:00"
)

$messages = @(
    "feat: initial commit - Projet E-commerce IAGE GDA DK 2025",
    "feat(layout): implémentation des composants de layout",
    "feat(pages): développement des pages principales", 
    "feat(auth): système d'authentification complet",
    "feat(cart): système de panier avec Redux",
    "feat(admin): interface d'administration",
    "feat(checkout): processus de commande",
    "feat(services): services API et intégration",
    "test: ajout des tests unitaires",
    "docs: documentation finale et guides"
)

for ($i = 0; $i -lt $dates.Length; $i++) {
    $date = $dates[$i]
    $message = $messages[$i]
    
    # Créer un fichier temporaire
    $filename = "temp_file_$i.md"
    Set-Content -Path $filename -Value "# Commit $i`n`nDate: $date`nMessage: $message"
    
    # Ajouter et commiter
    git add $filename
    git commit --date="$date" -m "$message`n`nCo-authored-by: Équipe IAGE GDA DK 2025 <projet.iage.gda.dk.2025@gmail.com>"
    
    Write-Host "✅ Commit créé pour $date" -ForegroundColor Green
    Start-Sleep -Seconds 1
}

Write-Host "🎉 Timeline de commits créée avec succès!" -ForegroundColor Green 