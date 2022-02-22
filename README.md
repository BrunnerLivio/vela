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
Type=oneshot
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

### Startup Management Server

```bash
# Install Node v16
cd management-server
npm i
vi /etc/systemd/system/node-app.service 

# Add
[Unit]
After=network.target

[Service]
Type=oneshot
User=root
RemainAfterExit=yes
WorkingDirectory=<INSTALLATION_DIR>/management-server/
ExecStart=<PATH_TO_NODE>/bin/node <INSTALLATION_DIR>/management-server/index.mjs
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target

# Run
sudo systemctl enable node-app
```

### Docker commands
```bash
# start
docker-compose up -d

# stop
docker-compose down
```
