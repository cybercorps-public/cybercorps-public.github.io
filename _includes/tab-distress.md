## DISTRESS

Інструмент з підтримкою проксі з усіх можливих країн за замовчуванням, вбудованою підтримкою Tor exit-вузлів, низьким навантаженням на CPU та автоматичним оновленням цілей від CyberCORPS UA.

- [Поради щодо використання](#поради-щодо-використання)
- [Оптимізація системи](#оптимізація-системи)
- [Встановлення та запуск](#встановлення-та-запуск)
  - [x100](#distress-x100)
  - [Linux](#linux)
  - [MacOS](#macos)
  - [Windows](#windows)
  - [Docker](#docker)
- [Опис виводу](#опис-виводу)
- [Довідка](#довідка)

## 1. Поради щодо використання {#поради-щодо-використання}

> **Увага:** Обов'язково використовуйте VPN з опцією `--use-my-ip`

> **Увага:** Не поєднуйте VPN з проксі — це може погіршити продуктивність

> **Увага:** Щоб запустити у фоні, використовуйте утиліти `screen` або `tmux`

> **Увага:** Для деяких розширених методів потрібно запускати інструмент від імені адміністратора

## 2. Оптимізація системи {#оптимізація-системи}

> **Примітка:** Тільки для досвідчених користувачів

- [Налаштування TCP-стека Linux](https://linux2me.wordpress.com/2018/06/03/tuning-the-tcp-stack-system-administrator/)
- [tuned -p network-throughput -d](https://tuned-project.org/)

## 3. Встановлення та запуск {#встановлення-та-запуск}

### 3.1 x100 {#distress-x100}

> **Примітка:** X100+Distress найкраще використовувати на VPS-серверах — це суттєво знижує ризик блокування.

Distress інтегровано до інструменту x100, повну документацію з налаштування та запуску можна знайти [тут](https://x100.vn.ua/docs/).

### 3.2 Linux {#linux}

```bash
wget https://github.com/corpus-dev/distress_releases/releases/latest/download/distress_x86_64-unknown-linux-musl
chmod +x distress_x86_64-unknown-linux-musl
./distress_x86_64-unknown-linux-musl
```

##### З використанням screen

```bash
wget https://github.com/corpus-dev/distress_releases/releases/latest/download/distress_x86_64-unknown-linux-musl
chmod +x distress_x86_64-unknown-linux-musl
screen -S "distress" ./distress_x86_64-unknown-linux-musl
```

### 3.3 MacOS {#macos}

```bash
wget https://github.com/corpus-dev/distress_releases/releases/latest/download/distress_x86_64-apple-darwin
chmod +x distress_x86_64-apple-darwin && sudo xattr -d com.apple.quarantine distress_x86_64-apple-darwin
./distress_x86_64-apple-darwin
```

### 3.4 Windows {#windows}

> **Примітка:** Рекомендується встановити [Linux-версію](#linux) через [WSL](https://docs.microsoft.com/en-us/windows/wsl/install) — вона стабільніша та продуктивніша.

Завантажте та запустіть [останній бінарний файл](https://github.com/corpus-dev/distress_releases/releases/latest/download/distress_x86_64-pc-windows-msvc.exe).

### 3.5 Docker {#docker}

> **Увага:** Docker не підтримує автоматичне оновлення.

```bash
docker run --rm -it --pull always --network host ghcr.io/corpus-dev/distress
```

## 4. Опис виводу {#опис-виводу}

| Колонка               | Опис                                                                                                        |
|-----------------------|-------------------------------------------------------------------------------------------------------------|
| `active_connections`  | Кількість успішно встановлених з'єднань у поточний момент                                                   |
| `bps`                 | Середня кількість біт за секунду з моменту останнього запису в лог (зчитується з мережевого інтерфейсу)     |
| `pps`                 | Середня кількість пакетів за секунду з моменту останнього запису в лог (зчитується з мережевого інтерфейсу) |
| `requests`            | Кількість запитів, виконаних інструментом з моменту останнього запису в лог                                 |
| `bytes`               | Байти, надіслані інструментом з моменту останнього запису в лог                                             |
| `pending_connections` | Кількість з'єднань у стані очікування                                                                       |

## 5. Довідка {#довідка}

```
./distress -h
```

```
Інструмент навантажувального тестування

Використання: distress [OPTIONS]

Опції:
  -v, --verbose...
          Збільшити детальність логування
  -q, --quiet...
          Зменшити детальність логування
  -t, --targets-path <TARGETS_PATH>
          Шлях або URL для отримання конфігурації цілей
  -c, --concurrency <CONCURRENCY>
          Кількість паралельних задач
      --use-my-ip <USE_MY_IP>
          Відсоток запитів через власний IP (від 0 до 100); добре працює з VPN [за замовчуванням: 0]
      --use-tor <USE_TOR>
          Кількість Tor-з'єднань на ціль (максимум 100)
      --disable-auto-update
          Вимкнути автоматичне оновлення
      --log-per-target
          Увімкнути виведення інформації по кожній цілі окремо
      --log-interval-sec <LOG_INTERVAL_SEC>
          Керування частотою логування
      --json-logs
          Виводити логи у форматі JSON
      --user-id <USER_ID>
          Надсилати персоналізовану статистику для отримання нагород у майбутньому
      --interface <INTERFACE>
          Розширено: назви мережевих інтерфейсів через кому (наприклад: --interface eth0,lo0)
      --read-timeout <READ_TIMEOUT>
          Розширено: таймаут читання сокета в мілісекундах [за замовчуванням: 10000]
      --tls-connect-timeout <TLS_CONNECT_TIMEOUT>
          Розширено: таймаут TLS-рукостискання в мілісекундах [за замовчуванням: 10000]
      --connect-timeout <CONNECT_TIMEOUT>
          Розширено: таймаут підключення сокета до цілей і проксі в мілісекундах [за замовчуванням: 10000]
      --proxy-connect-timeout <PROXY_CONNECT_TIMEOUT>
          Розширено: таймаут підключення через проксі в мілісекундах [за замовчуванням: 10000]
      --tor-connect-timeout <TOR_CONNECT_TIMEOUT>
          Розширено: таймаут Tor-з'єднання в мілісекундах [за замовчуванням: 10000]
      --h2-handshake-timeout <H2_HANDSHAKE_TIMEOUT>
          Розширено: таймаут H2-рукостискання в мілісекундах [за замовчуванням: 10000]
      --h2-ready-send-timeout <H2_READY_SEND_TIMEOUT>
          Розширено: таймаут готовності H2 до відправки в мілісекундах [за замовчуванням: 10000]
      --buffer-read-size <BUFFER_READ_SIZE>
          Розширено: розмір буфера читання потоку застосунку
      --buffer-write-size <BUFFER_WRITE_SIZE>
          Розширено: розмір буфера запису потоку застосунку
      --requests-per-conn <REQUESTS_PER_CONN>
          Розширено: кількість запитів на одне з'єднання [за замовчуванням: 128]
      --so-send-buf <SO_SEND_BUF>
          Розширено: опція сокета SO_SNDBUF (див. linux man)
      --so-recv-buf <SO_RECV_BUF>
          Розширено: опція сокета SO_RCVBUF (див. linux man)
      --disable-so-buf
          Розширено: вимкнути so_send_buf та so_recv_buf
      --disable-so-nolinger
          Розширено: вимкнути so_linger(0)
      --disable-tcp-nodelay
          Розширено: вимкнути опцію tcp_nodelay
      --worker-threads <WORKER_THREADS>
          Розширено: налаштувати кількість робочих потоків планувальника tokio
  -h, --help
          Вивести довідку (використовуйте `--help` для детальної інформації)
  -V, --version
          Вивести інформацію про версію
```
