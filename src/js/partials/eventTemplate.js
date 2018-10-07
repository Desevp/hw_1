const events = data.events;

(function() {
  // микрошаблонизации для Event
  let contentElement = document.querySelector('.test');

  if (contentElement) {
    renderTemplate(contentElement, 'event', events);
  }

  function renderTemplate(element, templateID, events) {


    events.forEach (function(event) {
      let template = document.getElementById(templateID).content.cloneNode(true);

      ///Type

      let tempType = template.querySelector('div[data-event-type]');
      if (event.type ==='critical') {
        tempType.classList.add('event--critical');
      }

      // Size
      tempType.classList.add(`event--size--${event.size}`);

      //Icon
      let tempIcon = template.querySelector('use[data-event-icon]');
      tempIcon.setAttribute('xlink:href', `images/sprite-svg.svg#${event.icon}`)

      //Title
      let tempTitle = template.querySelector('h2[data-event-title]');
      tempTitle.innerText = event.title;

      // Source
      let tempSource = template.querySelector('div[data-event-source]');
      tempSource.innerText = event.source;

      // Source
      let tempTime = template.querySelector('div[data-event-time]');
      tempTime.innerText = event.time;


      // Content

      if (event.description) {
        let templateContent = document.getElementById('event-content').content.cloneNode(true);

        // Description

        let tempDescription = templateContent.querySelector('div[data-event-description]');
        tempDescription.innerText = event.description;

        tempType.appendChild(templateContent);

        let templateContentInner = tempType.querySelector('.event__content');

        if (event.data && event.data.temperature) {
          let templateIndicators = document.getElementById('event-indicators').content.cloneNode(true);

          let tempTemperature = templateIndicators.querySelector('span[data-event-temperature]');

          tempTemperature.innerText = event.data.temperature;

          let tempHumidity = templateIndicators.querySelector('span[data-event-humidity]');
          tempHumidity.innerText = event.data.humidity;

          templateContentInner.appendChild(templateIndicators);
        }

        if (event.data && event.data.albumcover) {
          let tempMusic = document.getElementById('event-music').content.cloneNode(true);

          let tempMusicTrackName = tempMusic.querySelector('div[data-music-track-name]');
          tempMusicTrackName.innerText = `${event.data.track.name} - ${event.data.artist}`;

          let tempMusicTrackLength = tempMusic.querySelector('div[data-music-track-length]');
          tempMusicTrackLength.innerText = event.data.track.length;

          let tempMusicVolume = tempMusic.querySelector('div[data-music-volume]');
          tempMusicVolume.innerText = event.data.volume;

          templateContentInner.appendChild(tempMusic);
        }

        if (event.data && event.data.buttons) {
          let templateAlert = document.getElementById('event-alert').content.cloneNode(true);
          templateContentInner.appendChild(templateAlert);
        }
      }

      element.appendChild(template);
    });



















  }

})();
