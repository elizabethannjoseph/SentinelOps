import docker

client = docker.from_env()


def list_containers():
    return [container.name for container in client.containers.list()]


def get_container_info(container_name: str):

    container = client.containers.get(container_name)

    stats = container.stats(stream=False)

    cpu_total = stats["cpu_stats"]["cpu_usage"]["total_usage"]
    precpu_total = stats["precpu_stats"]["cpu_usage"]["total_usage"]

    system_cpu = stats["cpu_stats"].get("system_cpu_usage", 0)
    presystem_cpu = stats["precpu_stats"].get("system_cpu_usage", 0)

    cpu_delta = cpu_total - precpu_total
    system_delta = system_cpu - presystem_cpu

    cpu_count = max(
        len(stats["cpu_stats"]["cpu_usage"].get("percpu_usage", [])),
        1,
    )

    cpu_percent = 0.0

    if system_delta > 0:
        cpu_percent = (
            cpu_delta
            / system_delta
            * cpu_count
            * 100
        )

    memory_usage = (
        stats["memory_stats"]["usage"] / (1024 * 1024)
    )

    started_at = container.attrs["State"]["StartedAt"]
    restart_count = container.attrs["RestartCount"]

    return {
        "name": container.name,
        "status": container.status,
        "cpu_percent": round(cpu_percent, 2),
        "memory_mb": round(memory_usage, 2),
        "restart_count": restart_count,
        "started_at": started_at,
    }