include(["Engines", "Wine", "QuickScript", "OnlineScript"]);
include(["Engines", "Wine", "Verbs", "d3dx9"]);
include(["Engines", "Wine", "Verbs", "vcrun2013"]);

new OnlineScript()
    .name("Tera Online")
    .editor("ENMASSE")
    .author("ImperatorS79")
    .category("Games")
    .executable("TERA-Launcher.exe")
    .url("http://patch.tera.enmasse-game.com/TERA-Setup.exe")
    .checksum("6319e60b2a6267f65670c815ba25b6f0612e031a")
    .preInstall(function(wine, wizard) {
        wine.d3dx9();
        wine.vcrun2013();
    })
    .go();
