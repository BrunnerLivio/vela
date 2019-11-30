#!/bin/sh

set -x

#chmod -R a+rw /data/completed

TORRENTLIST=`transmission-remote --list | sed -e '1d;$d;s/^ *//' | cut -d " " -f 1`

for TORRENTID in $TORRENTLIST
do
  TORRENTID=`echo "$TORRENTID" | sed 's:*::'`

  DL_COMPLETED=`transmission-remote --torrent $TORRENTID --info | grep "Percent Done: 100%"`
  STATE_STOPPED=`transmission-remote --torrent $TORRENTID --info | grep "State: Stopped\|Finished\|Idle\|Seeding"`

  if [ "$DL_COMPLETED" != "" ] && [ "$STATE_STOPPED" != "" ]; then
    transmission-remote --torrent $TORRENTID --stop
    eval "sleep 1200; transmission-remote --torrent $TORRENTID --remove" &
  fi
done

# unrar everything
find /data/completed -name '*.rar' -execdir unrar e -o- {} \;
