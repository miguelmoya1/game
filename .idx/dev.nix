# To learn more about how to use Nix to configure your environment
# see: https://firebase.google.com/docs/studio/customize-workspace
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-24.05"; # or "unstable"

  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.docker
    pkgs.docker-client
    pkgs.nodejs_22
    pkgs.openssl
  ];

  services.docker.enable = true;
  

  # Sets environment variables in the workspace
  env = { };
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      # "vscodevim.vim"
      "Angular.ng-template"
      "arcanis.vscode-zipfs"
      "esbenp.prettier-vscode"
      "ms-azuretools.vscode-docker"
      "PKief.material-icon-theme"
      "usernamehw.errorlens"
    ];

    # Enable previews
    previews = {
      enable = true;
      previews = {
        web = {
          cwd = "./game";
          env = {
            PORT = "$PORT";
          };
          # Example: run "npm run dev" with PORT set to IDX's defined port for previews,
          # and show it in IDX's web preview panel
          command = [ "npm" "run" "start" "--" "--port" "$PORT" ];
          manager = "web"; 
        };
      };
    };

    # Workspace lifecycle hooks
    workspace = {
      # Runs when a workspace is first created
      onCreate = {
        install-backend = "cd backend && npm i";
        install-frontend = "cd frontend && npm i";
      };
      # Runs when the workspace is (re)started
      onStart = {
        start-docker = "docker compose up";
        watch-backend = "cd backend && npm run start:dev";
      };
    };
  };
}
