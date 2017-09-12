# elasticio-snazzycontacts
Elastic.io component for Snazzy Contacts


Die Komponente wurde ausgehend vom Hello-World-Beispiel entwickelt und dient als Proof-of-Concept. Sie wurde im Dezember 2016 von Christian Hahn (Wice GmbH) erstellt.

Mit dieser Komponente können "Flows" in elastic.io eingerichtet werden. Die Komponente unterstützt sowohl "Triggers" (z.B. "Get Persons") als auch "Actions" (z.B. "Update Person"), so dass mit der Komponente in Snazzy Contacts sowohl gelesen als auch geschrieben werden kann. Use Cases sind z.B. CSV-Import (Standard-CSV-Komponente zum Upload, Standard-Data-Mapper-Komponente zum Zuordnen der Felder, snazzycontacts-Komponente zum Erzeugen von Personen oder Organisationen) oder auch Timer zum Versenden aktualisierter Daten per Mail (snazzycontacts-Komponente mit Trigger "Get Persons" oder "Get Organizations" mit Parameter "last_updated_since", Standard-Data-Mapper zum Einfügen der Felder in ein Mail-Template, Versenden der Email mit der Standard-Email-Komponente und stündlichen mit Standard-Time-Komponente).

Checkout des Repositories geschieht nach Doku von Elastic.io (hierzu muss ein ein SSH-Schlüssel im Elastic.io-Dashboard hinterlegt werden, siehe app.elastic.io).

Um Änderungen im Code wirksam werden zu lassen, sind folgende Schritte notwendig:

git add ...
git commit -m"..."
git push elasticio master
Anschließend muss app.elastic.io reloaded werden.

Derzeit (Dec 2016) ist in lib/trigger/getOrganizations.js und lib/trigger/getOrganizations.js fest der Parameter "max_hits=10" eingebaut, um den Payload bei Tests gering zu halten. Im Produktionsbetrieb wird dieser Parameter entfernt oder auf einen hohen Wert gesetzt (Default: 1000). Optional kann auch der Parameter "last_updated_since" verwendet werden, mit dem nur Daten geliefert werden, die innerhalb der letzten xxx Sekunden aktualisiert oder hinzugefügt wurden.

Funktionen der Komponente:
Get Persons
Get Organizations
Create Person
Create Organization
Update Person
Update Organization

Das Löschen erfolgt mit "Update ..." zusammen mit dem Parameter "is_deleted=1". Das tatsächliche Löschen (d.h. negative Mandanten-ID) ist von der Komponente - genau wie im Web-Frontend - ausdrücklich nicht unterstützt, damit ein Löschen in Snazzy Contacts vom User immer rückgängig gemacht werden kann.
