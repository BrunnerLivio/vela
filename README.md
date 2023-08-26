# Media-server


### Mount media disks
```bash
# open fstab
vi /etc/fstab

# add
/dev/DISK      /services/media/series/ ext4    defaults 1 2
/dev/DISK      /services/media/movies/ ext4    defaults 1 2

# and mount all
sudo mount -a
```

### Startup Docker Compose

```bash
vi /etc/systemd/system/docker-compose-app.service


# Add
[Unit]
Description=Docker Compose Application Service
Requires=docker.service
After=docker.service

[Service]
Type=simple
RemainAfterExit=yes
WorkingDirectory=<INSTALLATION_DIR>
ExecStart=/usr/local/bin/docker-compose up -d
ExecStop=/usr/local/bin/docker-compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target


# Run
sudo systemctl enable docker-compose-app
```

### Docker commands
```bash
# start
docker-compose up -d

# stop
docker-compose down
```
