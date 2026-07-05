#!/bin/bash
set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

PROJECT_DIR="/opt"
LOG_FILE="/opt/deploy.log"

log() { echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"; }
warn() { echo -e "${YELLOW}[WARNING]${NC} $1" | tee -a "$LOG_FILE"; }
error() { echo -e "${RED}[ERROR]${NC} $1" | tee -a "$LOG_FILE"; exit 1; }

cmd_deploy() {
    log "Deploying HexaStudio..."
    cd "$PROJECT_DIR"
    docker compose down --remove-orphans
    docker compose build --no-cache
    docker compose up -d
    sleep 10
    cmd_status
    log "Deployment complete!"
}

cmd_restart() {
    log "Restarting HexaStudio services..."
    cd "$PROJECT_DIR"
    docker compose restart
    log "Services restarted!"
}

cmd_restart_service() {
    local service="${1:-}"
    if [ -z "$service" ]; then
        error "Usage: $0 restart-service <service-name>"
    fi
    log "Restarting $service..."
    cd "$PROJECT_DIR"
    docker compose restart "$service"
    log "$service restarted!"
}

cmd_stop() {
    log "Stopping HexaStudio..."
    cd "$PROJECT_DIR"
    docker compose stop
    log "Services stopped!"
}

cmd_start() {
    log "Starting HexaStudio..."
    cd "$PROJECT_DIR"
    docker compose up -d
    log "Services started!"
}

cmd_status() {
    log "Checking service status..."
    cd "$PROJECT_DIR"
    docker compose ps
    echo ""
    set -a; source /opt/.env 2>/dev/null || true; set +a
    log "Health checks:"
    echo -n "  Backend API:  "; docker compose exec -T backend node -e "fetch('http://localhost:4000/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))" >/dev/null 2>&1 && echo -e "${GREEN}OK${NC}" || echo -e "${RED}DOWN${NC}"
    echo -n "  Frontend:     "; docker compose exec -T frontend node -e "fetch('http://localhost:3000').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))" >/dev/null 2>&1 && echo -e "${GREEN}OK${NC}" || echo -e "${RED}DOWN${NC}"
    echo -n "  CMS Strapi:   "; docker compose exec -T cms node -e "fetch('http://localhost:1337').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))" >/dev/null 2>&1 && echo -e "${GREEN}OK${NC}" || echo -e "${RED}DOWN${NC}"
    echo -n "  PostgreSQL:   "; docker compose exec -T postgres pg_isready 2>/dev/null && echo -e "${GREEN}OK${NC}" || echo -e "${RED}DOWN${NC}"
    echo -n "  Redis:        "; docker compose exec -T redis redis-cli -a "${REDIS_PASSWORD}" ping 2>/dev/null | grep -q PONG && echo -e "${GREEN}OK${NC}" || echo -e "${RED}DOWN${NC}"
    echo -n "  MinIO:        "; docker compose exec -T minio curl -sf http://127.0.0.1:9000/minio/health/live >/dev/null 2>&1 && echo -e "${GREEN}OK${NC}" || echo -e "${RED}DOWN${NC}"
    echo -n "  Grafana:      "; docker compose exec -T grafana wget -qO- http://127.0.0.1:3000 >/dev/null 2>&1 && echo -e "${GREEN}OK${NC}" || echo -e "${RED}DOWN${NC}"
}

cmd_logs() {
    local service="${1:-}"
    cd "$PROJECT_DIR"
    if [ -z "$service" ]; then
        docker compose logs -f --tail=50
    else
        docker compose logs -f --tail=50 "$service"
    fi
}

cmd_backup() {
    log "Starting backup..."
    local BACKUP_DIR="/opt/backups/$(date +%Y%m%d_%H%M%S)"
    mkdir -p "$BACKUP_DIR"
    log "Backing up PostgreSQL..."
    docker compose exec -T postgres pg_dump -U hexastudio hexastudio | gzip > "$BACKUP_DIR/postgres.sql.gz"
    log "Backing up .env..."
    cp /opt/.env "$BACKUP_DIR/env.bak" 2>/dev/null || warn "No .env file found"
    log "Backing up Docker volumes..."
    docker run --rm -v hexastudio_postgres_data:/data -v "$BACKUP_DIR":/backup alpine tar czf /backup/postgres_data.tar.gz -C /data .
    log "Backup complete: $BACKUP_DIR"
    ls -lh "$BACKUP_DIR"
}

cmd_update() {
    log "Updating HexaStudio..."
    cd "$PROJECT_DIR"
    log "Pulling latest code..."
    git pull origin main
    log "Rebuilding and restarting..."
    docker compose down
    docker compose build --no-cache
    docker compose up -d
    log "Update complete!"
    cmd_status
}

cmd_shell() {
    local service="${1:-backend}"
    log "Opening shell in $service..."
    cd "$PROJECT_DIR"
    docker compose exec "$service" sh
}

cmd_db_migrate() {
    log "Running database migrations..."
    cd "$PROJECT_DIR"
    docker compose exec backend npm run migration:run
    log "Migrations complete!"
}

cmd_db_seed() {
    log "Seeding database..."
    cd "$PROJECT_DIR"
    docker compose exec backend npm run seed
    log "Database seeded!"
}

cmd_clean() {
    log "Cleaning up Docker resources..."
    cd "$PROJECT_DIR"
    docker compose down -v --remove-orphans
    docker system prune -f
    log "Cleanup complete!"
}

cmd_help() {
    echo -e "${BLUE}HexaStudio Deployment Script${NC}"
    echo ""
    echo "Usage: $0 <command> [options]"
    echo ""
    echo "Commands:"
    echo "  deploy              Full deployment (build + start)"
    echo "  start               Start all services"
    echo "  stop                Stop all services"
    echo "  restart             Restart all services"
    echo "  restart-service     Restart a specific service (e.g., backend)"
    echo "  status              Show service status and health checks"
    echo "  logs [service]      Show logs (all or specific service)"
    echo "  backup              Create database and config backup"
    echo "  update              Pull latest code and redeploy"
    echo "  shell [service]     Open shell in service (default: backend)"
    echo "  db-migrate          Run database migrations"
    echo "  db-seed             Seed database with initial data"
    echo "  clean               Remove all containers, volumes, and images"
    echo "  help                Show this help message"
}

COMMAND="${1:-help}"
shift || true

case "$COMMAND" in
    deploy)          cmd_deploy ;;
    start)           cmd_start ;;
    stop)            cmd_stop ;;
    restart)         cmd_restart ;;
    restart-service) cmd_restart_service "$@" ;;
    status)          cmd_status ;;
    logs)            cmd_logs "$@" ;;
    backup)          cmd_backup ;;
    update)          cmd_update ;;
    shell)           cmd_shell "$@" ;;
    db-migrate)      cmd_db_migrate ;;
    db-seed)         cmd_db_seed ;;
    clean)           cmd_clean ;;
    help|*)          cmd_help ;;
esac
