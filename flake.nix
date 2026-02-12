{
  description = "Fastify TypeScript development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        packages.default = pkgs.dockerTools.buildLayeredImage {
          name = "fastify-app";
          tag = "latest";

          # Minimal base configuration
          contents = with pkgs; [
            nodejs_20
            coreutils-full
            bash
          ];

          # Security: Run as non-root user
          config = {
            Cmd = [
              "${pkgs.nodejs_20}/bin/node"
              "dist/index.js"
            ];
            WorkingDir = "/app";
            User = "1000:1000";
            ExposedPorts = {
              "3000/tcp" = { };
            };
            Env = [
              "NODE_ENV=production"
              "PATH=/bin"
            ];
          };

          # Layer optimization for faster rebuilds
          maxLayers = 25;
        };

        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs_20
            nodePackages.typescript
            nodePackages.typescript-language-server
          ];

          shellHook = ''
            echo "TypeScript Fastify Dev Environment"
            echo "Node version: $(node --version)"
          '';
        };
      }
    );
}
