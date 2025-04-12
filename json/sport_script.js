(async () => {
    const jsonUrl = "/json/educat/educational_channels.json";

    async function loadJSON(url) {
        try {
            const response = await fetch(url, { cache: "no-store" });
            if (!response.ok) throw new Error("Ошибка загрузки JSON");
            return await response.json();
        } catch (error) {
            console.error("Ошибка загрузки JSON:", error);
            return null;
        }
    }

    function parseDate(dateString) {
        return new Date(
            parseInt(dateString.slice(0, 4)),
            parseInt(dateString.slice(4, 6)) - 1,
            parseInt(dateString.slice(6, 8)),
            parseInt(dateString.slice(8, 10)),
            parseInt(dateString.slice(10, 12))
        );
    }

    function formatDate(date) {
        return date.getFullYear().toString() +
            ("0" + (date.getMonth() + 1)).slice(-2) +
            ("0" + date.getDate()).slice(-2);
    }

    function formatTime(date) {
        return ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
    }

    function createProgramElement(program, isCurrent) {
        const element = document.createElement("div");
        element.classList.add("schedule-program-item");
        element.dataset.startTime = program.start;

        const startTime = parseDate(program.start);

        if (isCurrent) {
            element.innerHTML = `
                <span class='schedule-now-playing-time'>${formatTime(startTime)}</span>
                <span class='schedule-now-playing-title'>${program.title}</span>
                <div class='schedule-progress-container'>
                    <div class='schedule-progress-bar'></div>
                </div>
            `;
        } else {
            element.innerHTML = `
                <span class='schedule-program-time'>${formatTime(startTime)}</span>
                <span class='schedule-program-title'>${program.title}</span>
            `;
        }
        return element;
    }

    function updateProgressBar(programElement, startTime, stopTime, isUpdate = false) {
        const progressBar = programElement.querySelector(".schedule-progress-bar");
        const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Moscow" }));
        const totalDuration = stopTime - startTime;
        const elapsed = now - startTime;
        const newProgress = Math.max(0, Math.min(100, (elapsed / totalDuration) * 100));
        if (progressBar) {
            const currentWidth = parseFloat(progressBar.style.width) || 0;
            if (isUpdate) {
                if (currentWidth > 0) {
                    progressBar.style.width = `${currentWidth}%`;
                }
                setTimeout(() => {
                    progressBar.style.transition = "width 2s linear";
                    progressBar.style.width = `${newProgress}%`;
                }, 50);
            } else {
                progressBar.style.width = `${newProgress}%`;
            }
        }
    }

    function highlightCurrentProgram(data) {
        const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Moscow" }));
        const scheduleContainer = document.getElementById("channel-schedule");
        const channelId = scheduleContainer?.dataset.channelId;
        if (!channelId || !data[channelId]) return;

        let currentProgram = null;
        let nextPrograms = [];

        data[channelId].programmes.forEach(program => {
            const startTime = parseDate(program.start);
            const stopTime = parseDate(program.stop);

            if (now > stopTime) {
                const finishedElement = scheduleContainer.querySelector(`[data-start-time="${program.start}"]`);
                if (finishedElement) finishedElement.remove();
                return;
            }

            const isCurrent = now >= startTime && now <= stopTime;
            let programElement = scheduleContainer.querySelector(`[data-start-time="${program.start}"]`);

            if (!programElement) {
                programElement = createProgramElement(program, isCurrent);
                scheduleContainer.appendChild(programElement);
            } else {
                if (isCurrent) {
                    programElement.classList.add("schedule-current-label");
                    let timeSpan = programElement.querySelector(".schedule-program-time");
                    let titleSpan = programElement.querySelector(".schedule-program-title");
                    if (timeSpan) {
                        timeSpan.classList.remove("schedule-program-time");
                        timeSpan.classList.add("schedule-now-playing-time");
                    }
                    if (titleSpan) {
                        titleSpan.classList.remove("schedule-program-title");
                        titleSpan.classList.add("schedule-now-playing-title");
                    }
                    if (!programElement.querySelector(".schedule-progress-container")) {
                        const progressContainer = document.createElement("div");
                        progressContainer.classList.add("schedule-progress-container");
                        const progressBar = document.createElement("div");
                        progressBar.classList.add("schedule-progress-bar");
                        progressContainer.appendChild(progressBar);
                        programElement.appendChild(progressContainer);
                    }
                } else {
                    programElement.classList.remove("schedule-current-label");
                    let nowPlayingTime = programElement.querySelector(".schedule-now-playing-time");
                    let nowPlayingTitle = programElement.querySelector(".schedule-now-playing-title");
                    if (nowPlayingTime) {
                        nowPlayingTime.classList.remove("schedule-now-playing-time");
                        nowPlayingTime.classList.add("schedule-program-time");
                    }
                    if (nowPlayingTitle) {
                        nowPlayingTitle.classList.remove("schedule-now-playing-title");
                        nowPlayingTitle.classList.add("schedule-program-title");
                    }
                    const progressContainer = programElement.querySelector(".schedule-progress-container");
                    if (progressContainer) progressContainer.remove();
                }
            }

            if (isCurrent) {
                currentProgram = programElement;
                updateProgressBar(currentProgram, startTime, stopTime, true);
            } else if (now < startTime) {
                nextPrograms.push({ element: programElement, startTime, stopTime });
            }
        });

        if (!currentProgram && nextPrograms.length > 0) {
            nextPrograms.sort((a, b) => a.startTime - b.startTime);
            const next = nextPrograms[0];
            if (now >= next.startTime) {
                next.element.classList.add("schedule-current-label");
                if (!next.element.querySelector(".schedule-progress-container")) {
                    const progressContainer = document.createElement("div");
                    progressContainer.classList.add("schedule-progress-container");
                    const progressBar = document.createElement("div");
                    progressBar.classList.add("schedule-progress-bar");
                    progressContainer.appendChild(progressBar);
                    next.element.appendChild(progressContainer);
                }
                let timeSpan = next.element.querySelector(".schedule-program-time");
                let titleSpan = next.element.querySelector(".schedule-program-title");
                if (timeSpan) {
                    timeSpan.classList.remove("schedule-program-time");
                    timeSpan.classList.add("schedule-now-playing-time");
                }
                if (titleSpan) {
                    titleSpan.classList.remove("schedule-program-title");
                    titleSpan.classList.add("schedule-now-playing-title");
                }
                currentProgram = next.element;
                updateProgressBar(currentProgram, next.startTime, next.stopTime, true);
                nextPrograms.shift();
            }
        }

        let nowPlayingLabel = scheduleContainer.querySelector(".schedule-now-playing-label");
        if (currentProgram) {
            if (!nowPlayingLabel) {
                nowPlayingLabel = document.createElement("div");
                nowPlayingLabel.classList.add("schedule-now-playing-label");
                nowPlayingLabel.textContent = "Сейчас в эфире";
                scheduleContainer.prepend(nowPlayingLabel);
            }
        } else if (nowPlayingLabel) {
            nowPlayingLabel.remove();
        }

        let nextLabel = scheduleContainer.querySelector(".schedule-next-label");
        if (nextPrograms.length > 0) {
            if (!nextLabel) {
                nextLabel = document.createElement("div");
                nextLabel.classList.add("schedule-next-label");
                nextLabel.textContent = "Далее";
                scheduleContainer.appendChild(nextLabel);
            }
            nextPrograms.forEach(item => {
                scheduleContainer.appendChild(item.element);
            });
        } else if (nextLabel) {
            nextLabel.remove();
        }

        if (currentProgram && nowPlayingLabel) {
            scheduleContainer.insertBefore(currentProgram, nowPlayingLabel.nextSibling);
        }
    }

    async function init() {
        const data = await loadJSON(jsonUrl);
        if (data) {
            highlightCurrentProgram(data);
            setInterval(() => highlightCurrentProgram(data), 180000); // каждые 3 минуты
        }
    }

    init();
})();