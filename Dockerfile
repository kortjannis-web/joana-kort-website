FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm config set fetch-retries 5 \
 && npm config set fetch-retry-mintimeout 20000 \
 && npm config set fetch-retry-maxtimeout 120000 \
 && npm config set fetch-timeout 600000 \
 && npm ci --no-audit --no-fund
COPY . .
# NEXT_PUBLIC_* wird beim Build eingebacken: in Coolify als Build-Variable setzen (nach Änderung neu deployen, nicht nur neu starten)
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_INDEXABLE
ARG NEXT_PUBLIC_EMAIL
ARG NEXT_PUBLIC_PHONE
ARG NEXT_PUBLIC_WHATSAPP
ARG NEXT_PUBLIC_STREET
ARG NEXT_PUBLIC_ZIP
ARG NEXT_PUBLIC_INSTAGRAM
ARG NEXT_PUBLIC_LINKEDIN
ARG NEXT_PUBLIC_GOOGLE_PROFILE_URL
ARG NEXT_PUBLIC_GOOGLE_REVIEWS_URL
ARG NEXT_PUBLIC_GOOGLE_REVIEW_URL
ARG NEXT_PUBLIC_BOOKING_URL
ARG NEXT_PUBLIC_GSC_VERIFICATION
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_INDEXABLE=$NEXT_PUBLIC_INDEXABLE \
    NEXT_PUBLIC_EMAIL=$NEXT_PUBLIC_EMAIL \
    NEXT_PUBLIC_PHONE=$NEXT_PUBLIC_PHONE \
    NEXT_PUBLIC_WHATSAPP=$NEXT_PUBLIC_WHATSAPP \
    NEXT_PUBLIC_STREET=$NEXT_PUBLIC_STREET \
    NEXT_PUBLIC_ZIP=$NEXT_PUBLIC_ZIP \
    NEXT_PUBLIC_INSTAGRAM=$NEXT_PUBLIC_INSTAGRAM \
    NEXT_PUBLIC_LINKEDIN=$NEXT_PUBLIC_LINKEDIN \
    NEXT_PUBLIC_GOOGLE_PROFILE_URL=$NEXT_PUBLIC_GOOGLE_PROFILE_URL \
    NEXT_PUBLIC_GOOGLE_REVIEWS_URL=$NEXT_PUBLIC_GOOGLE_REVIEWS_URL \
    NEXT_PUBLIC_GOOGLE_REVIEW_URL=$NEXT_PUBLIC_GOOGLE_REVIEW_URL \
    NEXT_PUBLIC_BOOKING_URL=$NEXT_PUBLIC_BOOKING_URL \
    NEXT_PUBLIC_GSC_VERIFICATION=$NEXT_PUBLIC_GSC_VERIFICATION
ENV NODE_OPTIONS="--max_old_space_size=1024"
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Docker setzt HOSTNAME auf die Container-ID: explizit auf alle Interfaces lauschen (Traefik)
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
# Anfragen werden hier gespeichert: in Coolify als persistentes Volume auf /app/data mounten
RUN mkdir -p /app/data && chmod 700 /app/data
EXPOSE 3000
CMD ["node", "server.js"]
