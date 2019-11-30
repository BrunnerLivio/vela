# Media-server
> Automated movies & series download

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

### Docker commands
```bash
# start
docker-compose up -d

# stop
docker-compose down
