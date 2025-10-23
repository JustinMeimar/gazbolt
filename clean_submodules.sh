git submodule deinit -f ./dragon-runner
git rm --cached ./dragon-runner
rm -rf .git/modules/dragon-runner ./dragon-runner
git commit -m "Cleanup old submodule entries"

git submodule add -b gazbolt https://github.com/cmput415/Dragon-Runner.git ./dragon-runner
git submodule update --init --recursive  # <--- Crucial step to populate the folder
git commit -m "Re-add Dragon-Runner submodule"
