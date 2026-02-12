FROM nixos/nix:latest AS deps

WORKDIR /build

COPY package*.json  ./

RUN echo "experimental-features = nix-command flakes" >> /etc/nix/nix.conf

RUN nix-shell -p nodejs_20 --run "npm ci"

FROM nixos/nix:latest AS builder
WORKDIR /build

COPY --from=deps /build/node_modules ./node_modules
COPY package*.json  tsconfig.json ./
COPY src ./src

RUN echo "experimental-features = nix-command flakes" >> /etc/nix/nix.conf

RUN nix-shell -p nodejs_20 --run "npm run build"

FROM nixos/nix:latest AS prod-deps

WORKDIR /build

COPY package*.json  ./

RUN echo "experimental-features = nix-command flakes" >> /etc/nix/nix.conf
RUN nix-shell -p nodejs_20 --run "npm ci --only=production"

FROM gcr.io/distroless/nodejs20-debian12:nonroot

WORKDIR /app

COPY --from=prod-deps /build/node_modules ./node_modules
COPY --from=builder /build/dist ./dist
COPY --from=builder /build/package.json ./

EXPOSE 3000

CMD ["dist/main/app.js"]
